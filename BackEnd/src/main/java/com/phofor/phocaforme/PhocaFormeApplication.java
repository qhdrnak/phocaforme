package com.phofor.phocaforme;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PhocaFormeApplication {

   public static void main(String[] args) {
      SpringApplication.run(PhocaFormeApplication.class, args);
   }

}
