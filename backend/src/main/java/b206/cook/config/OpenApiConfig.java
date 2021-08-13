package b206.cook.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.management.MXBean;

@OpenAPIDefinition(info = @Info(title = "리시피 API 명세서", description = "API 명세서", version = "0.1"))
@Configuration
public class OpenApiConfig {
    @Bean
    public GroupedOpenApi foodsApis() {
        return GroupedOpenApi.builder().setGroup("foods").pathsToMatch("/foods/**").build();
    }

    @Bean
    public GroupedOpenApi memberApis() {
        return GroupedOpenApi.builder().setGroup("member").pathsToMatch("/member/**").build();
    }

    @Bean
    public GroupedOpenApi articleApis() {
        return GroupedOpenApi.builder().setGroup("article").pathsToMatch("/article/**").build();
    }

    @Bean
    public GroupedOpenApi articlesApis() {
        return GroupedOpenApi.builder().setGroup("articles").pathsToMatch("/articles").build();
    }
//
//    @Bean
//    public GroupedOpenApi recipeApis() {
//        return GroupedOpenApi.builder().setGroup("recipe").pathsToMatch("/foods/**/recipe/**").build();
//    }
}
