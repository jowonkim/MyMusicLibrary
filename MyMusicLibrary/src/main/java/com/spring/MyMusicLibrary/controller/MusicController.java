package com.spring.MyMusicLibrary.controller;

// 필요한 Java 및 Spring 패키지들을 import합니다.
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.MyMusicLibrary.dto.MusicDTO;
import com.spring.MyMusicLibrary.service.MusicServiceImpl;

// @CrossOrigin 애너테이션은 CORS 설정을 도와줍니다. 
@CrossOrigin(origins = "**", maxAge = 3600) 
@RestController // 이 클래스가 RESTful 웹 서비스를 처리하는 컨트롤러임을 명시합니다.
@RequestMapping(value = "/music") // 이 컨트롤러의 기본 URL을 "/music"로 설정합니다.
public class MusicController {

   @Autowired // 스프링이 musicServiceImpl 빈을 주입합니다.
   private MusicServiceImpl service;

   // 로깅을 위한 Logger 객체를 생성합니다.
   private static final Logger logger = LoggerFactory.getLogger(MusicController.class);

   // 음악 목록을 반환하는 메서드입니다.
   // GET 요청을 "/music"로 받습니다.
   @GetMapping("/")
   public List<MusicDTO> musicList(HttpServletRequest req, HttpServletResponse res, Model model)
         throws ServletException, IOException {

      // 로깅 정보 출력
      logger.info("<<< url - musicList");
      
      // 서비스의 listAll() 메서드를 호출하여 모든 음악 목록을 반환합니다.
      return service.listAll();
   }

   // 새로운 음악을 추가하는 메서드입니다.
   // POST 요청을 "/music"로 받습니다.
   @PostMapping("/")
   public Map<String, Object> musicInsert(@RequestBody MusicDTO dto) throws ServletException, IOException {
      logger.info("<<< url - musicInsert"); // 로깅 정보 출력

      String resultCode = ""; // 응답 코드 초기화
      String resultMsg = "";  // 응답 메시지 초기화

      // 결과를 저장할 맵을 초기화합니다.
      Map<String, Object> map = new HashMap<String, Object>();
      try {
         // 서비스의 insertmusic() 메서드를 호출하여 음악을 추가합니다.
         int insertCnt = service.insertMusic(dto);
         
         // 삽입이 성공하면, 응답 코드를 200으로 설정하고 성공 메시지를 설정합니다.
         if (insertCnt == 1) {
            resultCode = "200";
            resultMsg = "musicInsert Success!";
         }
      } catch (Exception e) {
         // 에러가 발생하면, 응답 코드를 400으로 설정하고 에러 메시지를 설정합니다.
         resultCode = "400";
         resultMsg = e.getMessage();
      }

      // 응답 코드를 맵에 추가합니다.
      map.put("resultCode", resultCode);
      // 응답 메시지를 맵에 추가합니다.
      map.put("resultMsg", resultMsg);

      // 디버그용 메시지를 콘솔에 출력합니다.
      System.out.println("[ musicInsert 성공 ~~ ]");

      // 결과 맵을 반환합니다.
      return map;
   }

   // 특정 음악의 정보를 반환하는 메서드입니다.
   // GET 요청을 "/music/{id}"로 받습니다.
   @GetMapping("/{id}")
   public MusicDTO musicById(@PathVariable int id) throws ServletException, IOException {
      logger.info("<<< url - musicById"); // 로깅 정보 출력
      
      // 서비스의 findById() 메서드를 호출하여 해당 ID의 음악을 찾습니다.
      MusicDTO dto = service.findById(id);

      // 찾은 음악 정보를 반환합니다.
      return dto;
   }

   // 특정 음악의 정보를 업데이트하는 메서드입니다.
   // PUT 요청을 "/music/{id}"로 받습니다.
   @PutMapping("/{id}")
   public Map<String, Object> musicUpdate(@PathVariable int id, @RequestBody MusicDTO dto) 
         throws ServletException, IOException {
      logger.info("<<< url - musicUpdate"); // 로깅 정보 출력

      String resultCode = ""; // 응답 코드 초기화
      String resultMsg = "";  // 응답 메시지 초기화

      // 결과를 저장할 맵을 초기화합니다.
      Map<String, Object> map = new HashMap<String, Object>();
      
      try {
         // DTO에 ID를 설정합니다.
         dto.setId(id);
         
         // 서비스의 updatemusic() 메서드를 호출하여 음악을 업데이트합니다.
         int updateCnt = service.updateMusic(dto);
         
         // 업데이트가 성공하면, 응답 코드를 200으로 설정하고 성공 메시지를 설정합니다.
         if (updateCnt == 1) {
            resultCode = "200";
            resultMsg = "musicUpdate Success!";
         }
      } catch (Exception e) {
         // 에러가 발생하면, 응답 코드를 400으로 설정하고 에러 메시지를 설정합니다.
         resultCode = "400";
         resultMsg = e.getMessage();
      }

      // 응답 코드를 맵에 추가합니다.
      map.put("resultCode", resultCode);
      // 응답 메시지를 맵에 추가합니다.
      map.put("resultMsg", resultMsg);

      // 디버그용 메시지를 콘솔에 출력합니다.
      System.out.println("[ musicUpdate 성공  ]");

      // 결과 맵을 반환합니다.
      return map;
   }
   
   // 특정 음악을 삭제하는 메서드입니다.
   // DELETE 요청을 "/music/{id}"로 받습니다.
   @DeleteMapping("/{id}")
   public Map<String, Object> musicDelete(@PathVariable int id) throws ServletException, IOException {
      logger.info("<<< url - musicDelete"); // 로깅 정보 출력

      String resultCode = ""; // 응답 코드 초기화
      String resultMsg = "";  // 응답 메시지 초기화

      // 결과를 저장할 맵을 초기화합니다.
      Map<String, Object> map = new HashMap<String, Object>();
      
      try {
         // 서비스의 deleteMusic() 메서드를 호출하여 음악을 삭제합니다.
         int deleteCnt = service.deleteMusic(id);
         
         // 삭제가 성공하면, 응답 코드를 200으로 설정하고 성공 메시지를 설정합니다.
         if (deleteCnt == 1) {
            resultCode = "200";
            resultMsg = "musicDelete Success!";
         }
      } catch (Exception e) {
         // 에러가 발생하면, 응답 코드를 400으로 설정하고 에러 메시지를 설정합니다.
         resultCode = "400";
         resultMsg = e.getMessage();
      }
      
      // 응답 코드를 맵에 추가합니다.
      map.put("resultCode", resultCode);
      // 응답 메시지를 맵에 추가합니다.
      map.put("resultMsg", resultMsg);

      // 디버그용 메시지를 콘솔에 출력합니다.
      System.out.println("[ musicDelete 성공  ]");

      // 결과 맵을 반환합니다.
      return map;
   }

}
