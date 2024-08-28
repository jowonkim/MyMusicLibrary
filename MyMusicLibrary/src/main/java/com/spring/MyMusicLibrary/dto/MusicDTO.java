package com.spring.MyMusicLibrary.dto;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="mvc_music_tbl")
public class MusicDTO {
	
	private int id;
	private String title;
	private String artist;
	private String genre;
	private Date releaseDate;
	private int price;
	
	// @GeneratedValue(strategy=GenerationType.IDENTITY)  // PK(id)를 AUTO_INCREMENT로 생성한 경우
	@Id
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getArtist() {
		return artist;
	}

	public void setArtist(String artist) {
		this.artist = artist;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public Date getReleaseDate() {
		return releaseDate;
	}

	public void setReleaseDate(Date releaseDate) {
		this.releaseDate = releaseDate;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	@Override
	public String toString() {
		return "MusicDTO [id=" + id + ", title=" + title + ", artist=" + artist + ", genre=" + genre + ", releaseDate="
				+ releaseDate + ", price=" + price + "]";
	}
	
	
	
}


