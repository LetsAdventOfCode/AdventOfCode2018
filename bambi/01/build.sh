#!/bin/bash
iverilog -o build.o -Wall -g2012 testbench.sv design.sv
vvp build.o && rm build.o # && open /Applications/gtkwave.app dump.vcd
