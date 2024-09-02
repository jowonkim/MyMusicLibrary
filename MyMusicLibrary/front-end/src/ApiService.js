import axios from 'axios';

// API의 기본 URL
const MUSIC_API_BASE_URL = "http://localhost:8080/tigerdb/";

class ApiService {
    // 제품 목록을 가져오는 메서드
    fetchMusics() {
        console.log('fetchMusics() 호출!!');
        return axios.get(MUSIC_API_BASE_URL);
    }

    // 제품을 추가하는 메서드
    addMusic(music) {
        console.log('addMusic() 호출!!');
        return axios.post(MUSIC_API_BASE_URL, music);
    }

    // 특정 ID로 제품을 가져오는 메서드
    fetchMusicById(musicId) {
        console.log('fetchMusicById() 호출!!');
        return axios.get(MUSIC_API_BASE_URL + "/" + musicId);
    }

    // 제품을 업데이트하는 메서드
    editMusic(musicId, music) {
        console.log('editMusic() 호출!!');
        return axios.put(`${MUSIC_API_BASE_URL}/${musicId}`, music);
    }

    // 특정 ID로 제품을 삭제하는 메서드
    deleteMusic(musicId) {
        console.log('deleteMusic() 호출!!');
        return axios.delete(`${MUSIC_API_BASE_URL}/${musicId}`);
    }
}

export default new ApiService();
