package com.spring.MyMusicLibrary.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.MyMusicLibrary.dao.MusicMapper;
import com.spring.MyMusicLibrary.dto.MusicDTO;

@Service
public class MusicServiceImpl implements MusicService {

   @Autowired
   private MusicMapper dao;
   
   
   @Override
   public List<MusicDTO> listAll() throws ServletException, IOException {
      System.out.println("서비스 - listAll()");
      

      List<MusicDTO> list = dao.musicList();
      System.out.println("list : " + list);
      return list;
   }

   @Override
   public int insertMusic(MusicDTO dto) throws ServletException, IOException {
      System.out.println("서비스 - insertMusic()");

      int insertCnt = dao.insertMusic(dto);

      return insertCnt;
   }

   @Override
   public int updateMusic(MusicDTO dto) throws ServletException, IOException {
      System.out.println("서비스 - updateMusic()");

      int updateCnt = dao.updateMusic(dto);

      return updateCnt;
   }

   @Override
   public int deleteMusic(int id) throws ServletException, IOException {
      System.out.println("서비스 - updateMusic()");

      int deleteCnt = dao.deleteMusic(id);

      return deleteCnt;
   }

   @Override
   public MusicDTO findById(int id) throws ServletException, IOException {
      System.out.println("서비스 - findById()");

      MusicDTO dto = dao.selectMusic(id);

      return dto;
   }

}
