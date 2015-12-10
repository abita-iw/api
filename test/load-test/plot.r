setwd("/home/asg4/Programming/Class/497/node-api/test/load-test/");

results = read.csv("results.csv");

barplot(results[[2]], names.arg = results[[1]], ylab = "Rate (rps)");
barplot(results[[3]], names.arg = results[[1]], ylab = "Length (ms)");