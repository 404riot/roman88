package com.roman.romanpalpal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.embedded.tomcat.TomcatConnectorCustomizer;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
public class Roman88Application extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(Roman88Application.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(Roman88Application.class);
    }

    @Configuration
    public class TomcatWebServerCustomizer
            implements WebServerFactoryCustomizer<TomcatServletWebServerFactory> {

        /**
         * 톰캣에 옵션 추가.
         *
         * @param factory
         */
        @Override
        public void customize(TomcatServletWebServerFactory factory) {
            factory.addConnectorCustomizers((TomcatConnectorCustomizer)
                    connector -> connector.setAttribute("relaxedQueryChars", "<>[\\]^`{|}"));
        }
    }
}