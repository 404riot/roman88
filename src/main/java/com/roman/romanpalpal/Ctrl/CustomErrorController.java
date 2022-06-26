package com.roman.romanpalpal.Ctrl;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

// ======================== refresh 404 방지
@Controller
public class CustomErrorController implements ErrorController {

    @RequestMapping("/error")
    public String handleError() {
        return "/index.html";
    }

    public String getErrorPath() {
        return "/error";
    }

}
