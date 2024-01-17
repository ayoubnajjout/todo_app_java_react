package com.project.backend.helloworld;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

    @GetMapping(path = "helloworld")
    public String helloworld(){
        return "hello world !";
    }

    @GetMapping(path = "helloworldbean")
    public HelloWorld helloworldbean(){
        return new HelloWorld("hello world bean !");
    }

    @GetMapping(path = "helloWorldBeanpathvariable/{name}")
    public HelloWorld helloWorldBeanpathvariable(@PathVariable String name){
        return new HelloWorld(String.format("hello world path variable, %s",name));
    }


}
