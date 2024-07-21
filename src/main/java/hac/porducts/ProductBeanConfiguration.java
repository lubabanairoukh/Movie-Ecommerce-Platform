package hac.porducts;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.annotation.SessionScope;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class ProductBeanConfiguration {
    @Bean
    @SessionScope
    public List<Product> productList() {
        return new ArrayList<>();
    }

}
