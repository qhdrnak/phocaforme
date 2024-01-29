// 로그인 페이지 컴포넌트
import React from 'react';
import logo from '../../assets/images/logo.PNG';
import icon from '../..//assets/images/icon.PNG';
import kakao from '../../assets/images/kakao.png';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
	const navigate = useNavigate();
	return (
		<div>
			<img 
					style={{
						position: 'absolute',
						width: '7rem',
						height: '3rem',
						objectFit: 'contain',
						top: '100',
						left: '100',
						
					}}
					src={logo}
					onClick={() => {
						navigate("/main");
					}}
				/>

			<div 
				style={{
					position: 'relative',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					
				}}
			>	
				<img 
					src={icon}
					style={{
						width: '200px',
						height: '200px',
						marginTop: '40px',
						objectFit: 'contain',
						
					}}
				/>
				<div
					style={{
						textAlign: 'center',
					}}
				>
					<h2><b>안녕하세요 포포입니다.</b></h2>
					<br/>
					<h3>계정과 비밀번호 입력없이 <br />카카오톡으로 로그인 해보세요.</h3>
					<img 
          src={kakao}
          style={{
            objectFit: 'contain',
            
          }}
        />
				</div>

				
        
				
			</div>
		</div>
	)
}

export default LoginPage;