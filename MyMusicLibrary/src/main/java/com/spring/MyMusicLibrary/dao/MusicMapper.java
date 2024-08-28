package com.spring.MyMusicLibrary.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

import com.spring.MyMusicLibrary.dto.MusicDTO;

@Mapper		// DAOImpl 작성하지 않아도 mapper 호출가능
public interface MusicMapper{
	
	// 상품목록
	public List<MusicDTO> musicList();
	
	// 상품등록
	public int insertMusic(MusicDTO dto);
	
	// 상품수정
	public int updateMusic(MusicDTO dto);
	
	// 상품삭제
	public int deleteMusic(int id);
	
	// 상품상세
	public MusicDTO selectMusic(int id);
	
}
