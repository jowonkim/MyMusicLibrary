package com.spring.MyMusicLibrary.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;

import com.spring.MyMusicLibrary.dto.MusicDTO;

public interface MusicService {

	// 상품목록
	public List<MusicDTO> listAll()
		throws ServletException, IOException;
	
	// 상품등록
	public int insertMusic(MusicDTO dto)
		throws ServletException, IOException;
	
	// 상품수정
	public int updateMusic(MusicDTO dto)
			throws ServletException, IOException;
	// 상품삭제
	public int deleteMusic(int id)
			throws ServletException, IOException;
	// 상품상세
	public MusicDTO findById(int id)
			throws ServletException, IOException;
}
