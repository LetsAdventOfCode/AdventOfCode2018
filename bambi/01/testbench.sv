`timescale 1ns/1ns

module day01_TB();
  reg CLK = 0;
  always #1 CLK = ~CLK;
  reg RST = 1;
  
  reg signed [19:0] frequency_initial = 0;
  reg signed [19:0] frequency_result;
  reg signed [19:0] calibration_list [1023:0];
  reg [9:0] calibration_list_length;

  reg fc_enable = 0;
  reg fc_ready;
  reg fc_re_iterate = 0;
  frequency_calibrator fc(
    .CLK(CLK),
    .RST(RST),
    .enable(fc_enable),
    .ready(fc_ready),
    .re_iterate(fc_re_iterate),
    .frequency_initial(frequency_initial),
    .frequency_result(frequency_result),
    .calibration_list(calibration_list),
    .calibration_list_length(calibration_list_length)
  );

  task execute_calibration;
    input reg [19:0] initial_value;
    begin
      frequency_initial = initial_value;
      fc_enable = 1;
      @(negedge fc_ready);
      fc_enable = 0;
      @(posedge fc_ready);

      $display("frequency_result: %d", frequency_result);
    end
  endtask

  integer               data_file;
  integer               scan_file;
  logic   signed [31:0] captured_data;
  
  task load_input;
    begin
      data_file = $fopen("input.dat", "r");
      if (data_file == 0) begin
        $display("data_file handle was NULL");
        $finish;
      end
      
      calibration_list_length = 0;
      while (!$feof(data_file)) begin
        scan_file = $fscanf(data_file, "%d\n", captured_data);
        calibration_list[calibration_list_length] = captured_data;
        calibration_list_length = calibration_list_length + 1;
      end
    end
  endtask

  initial begin
    $dumpfile("dump.vcd");
    $dumpvars(0, day01_TB);
    
    #2
    RST = 0;
    #2

    calibration_list[0] = +1;
    calibration_list[1] = -2;
    calibration_list[2] = +3;
    calibration_list[3] = +1;
    calibration_list_length = 4;
    execute_calibration(0);

    calibration_list[0] = +1;
    calibration_list[1] = +1;
    calibration_list[2] = +1;
    calibration_list_length = 3;
    execute_calibration(0);
    
    calibration_list[0] = +1;
    calibration_list[1] = +1;
    calibration_list[2] = -2;
    calibration_list_length = 3;
    execute_calibration(0);
    
    calibration_list[0] = -1;
    calibration_list[1] = -2;
    calibration_list[2] = -3;
    calibration_list_length = 3;
    execute_calibration(0);
    
    load_input();
    execute_calibration(0);
    
    fc_re_iterate = 1;
    execute_calibration(0);
    #2
    $finish;
  end
endmodule
