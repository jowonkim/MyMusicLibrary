import { Button, TextField, Typography } from "@mui/material";
import React, { Component } from "react";
import ApiService from '../../ApiService'; // ApiService를 가져오는 부분

class DeleteMusicComponent extends Component {

    constructor(props) {
        super(props);

        // 초기 상태(state)를 설정합니다.
        this.state = {
            id: '', // 삭제할 음악의 ID
            message: '' // 삭제 결과 메시지
        }
    }

    // 입력 필드의 값을 state에 업데이트하는 역할을 합니다.
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value // 입력된 값을 해당 state에 반영합니다.
        });
    }

    // 음악을 삭제하는 함수입니다.
    deleteMusic = (e) => {
        e.preventDefault(); // 기본 폼 제출을 방지합니다.

        // 삭제 요청을 ApiService를 통해 보냅니다.
        ApiService.deleteMusic(this.state.id)
            .then(res => {
                console.log('Delete 성공', res.data);
                this.setState({ message: 'Music deleted successfully.' }); // 성공 메시지를 설정합니다.
                this.props.history.push("/music"); // 음악 목록 페이지로 리디렉션합니다.
            })
            .catch(err => {
                console.log('deleteMusic() Error', err); // 에러가 발생하면 콘솔에 출력합니다.
                this.setState({ message: 'Error deleting music.' }); // 실패 메시지를 설정합니다.
            });
    }

    render() {
        return (
            <div align="center">
                <br></br>
                <Typography variant="h4"> Delete Music </Typography> {/* 제목을 표시합니다. */}

                <TextField
                    required
                    id="standard-required"
                    variant="standard"
                    label="Music ID"
                    type="text"
                    name="id"
                    value={this.state.id} // 음악 ID 입력 필드
                    placeholder="Input Music ID to delete"
                    onChange={this.onChange} // 입력 값이 변경되면 onChange 함수가 호출됩니다.
                /><br /><br />

                <Button variant="contained" color="primary" onClick={this.deleteMusic}> Delete </Button> {/* 삭제 버튼 */}

                {/* 삭제 결과 메시지를 표시합니다. */}
                {this.state.message && <Typography variant="body1">{this.state.message}</Typography>}
            </div>
        )
    }
}

export default DeleteMusicComponent;
