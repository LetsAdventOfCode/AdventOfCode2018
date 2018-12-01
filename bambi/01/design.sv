`timescale 1ns/1ns

module frequency_calibrator(
  input CLK,
  input RST,
  input enable,
  output ready,
  
  input re_iterate,
  
  input signed [19:0] frequency_initial,
  output reg signed [19:0] frequency_result,
  input signed [19:0] calibration_list [1023:0],
  input [9:0] calibration_list_length
);
  
  reg [1048575:0] stumbled = 0;

  reg signed [19:0] frequency_calculation;
  reg [9:0] list_counter = 0;

  localparam [3:0]
    state_idle = 4'b0000,
    state_init = 4'b0001,
    state_calc = 4'b0010,
    state_done = 4'b0100;
  reg [3:0] state = state_idle;

  always @(posedge CLK) begin
    if (RST) begin
      state <= state_idle;
    end
    else begin
      case (state)
        state_idle: begin
          if (enable) begin
            state <= state_init;
          end
        end

        state_init: begin
          frequency_calculation <= frequency_initial;
          list_counter <= 0;
          state <= state_calc;
        end

        state_calc: begin
          frequency_calculation = frequency_calculation + calibration_list[list_counter];
          if (re_iterate) begin
            if (stumbled[frequency_calculation]) begin
              frequency_result <= frequency_calculation;
              state <= state_idle;
            end
            else begin
              //$display("%h", stumbled);
              stumbled[frequency_calculation] <= 1;
            end
          end
          list_counter = list_counter + 1;
          if (list_counter == calibration_list_length) begin
            state <= state_done;
          end
        end

        state_done: begin
          if (re_iterate) begin
            list_counter <= 0;
            state <= state_calc;
            $display("re-iterate");
          end
          else begin
            frequency_result <= frequency_calculation;
            state <= state_idle;
          end
        end

        default: begin
          state <= state_idle;
        end
      endcase
    end
  end

  assign ready = (state == state_idle);
endmodule
