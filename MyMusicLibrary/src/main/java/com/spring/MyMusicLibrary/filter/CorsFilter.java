package com.spring.MyMusicLibrary.filter;

// 필요한 패키지들을 import합니다.
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component // 이 클래스를 Spring 컨텍스트에 Bean으로 등록합니다.
@Order(Ordered.HIGHEST_PRECEDENCE) // 이 필터가 가장 높은 우선순위를 갖도록 설정합니다.
public class CorsFilter implements Filter { // CorsFilter 클래스는 Filter 인터페이스를 구현합니다.
   
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // 필터 초기화 메서드. 여기서는 기본 구현만 호출합니다.
        Filter.super.init(filterConfig);
    }

    // 필터의 핵심 기능을 수행하는 메서드입니다.
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        // HttpServletRequest 및 HttpServletResponse 객체로 캐스팅합니다.
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;
        
        // 클라이언트에서 서버로의 요청을 허용하는 Origin을 설정합니다. "*"는 모든 도메인을 허용함을 의미합니다.
        response.setHeader("Access-Control-Allow-Origin", "*");
        
        // 서버가 자격 증명 정보(예: 쿠키, 인증 헤더)를 포함한 요청을 허용하도록 설정합니다.
        response.setHeader("Access-Control-Allow-Credentials", "true");
        
        // 클라이언트에서 허용되는 HTTP 메서드들을 설정합니다. "*"는 모든 메서드를 허용함을 의미합니다.
        response.setHeader("Access-Control-Allow-Methods", "*");
        
        // CORS 설정이 클라이언트에 의해 캐시될 수 있는 최대 시간(초)입니다.
        response.setHeader("Access-Control-Max-Age", "3600");
        
        // 서버가 클라이언트에서 허용하는 요청 헤더들을 설정합니다.
        response.setHeader("Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept, Authorization");

        // HTTP 요청 메서드가 OPTIONS일 경우(프리플라이트 요청), 상태 코드를 200으로 설정하고 요청을 종료합니다.
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
        } else {
            // OPTIONS 요청이 아닌 경우, 다음 필터로 요청을 전달합니다.
            chain.doFilter(req, res);
        }
    }

    @Override
    public void destroy() {
        // 필터가 종료될 때 호출되는 메서드입니다. 여기서는 기본 구현만 호출합니다.
        Filter.super.destroy();
    }
}
