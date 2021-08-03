package b206.cook.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(info = @Info(title = "리시피 API 명세서", description = "API 명세서", version = "0.1"))
@Configuration
public class OpenApiConfig {
    @Bean
    public GroupedOpenApi foodsApis() {
        return GroupedOpenApi.builder().setGroup("foods").pathsToMatch("/foods/**").build();
    }

    public GroupedOpenApi memberApis() {
        return GroupedOpenApi.builder().setGroup("member").pathsToMatch("/member/**").build();
    }

    public GroupedOpenApi articleApis() {
        return GroupedOpenApi.builder().setGroup("article").pathsToMatch("/article/**").build();
    }
}
