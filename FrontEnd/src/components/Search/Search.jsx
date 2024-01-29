 
import { useState } from "react";
import { Button } from "../UI/Button.jsx";
// import styled from 'styled-components';
import { styled } from "@mui/system";
import RadioButton from "../UI/RadioButton.jsx";
import SearchBar from './SearchBar.jsx';



const Search = function () {
  const [userInput, setUserInput] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [isExchange, setIsExchange] = useState(true);

  function onClick() {
    setIsClicked((prevIsClicked) => !prevIsClicked);
  }

  function onExchangeChange(value) {
    setIsExchange(value === "option1");
  }

  const SearchContainer = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%; /* 100% 높이로 설정하거나 원하는 높이로 조절하세요 */
    `;

  return (
    <section id="user-input">
      
      <div>
        <h3 onClick={onClick}>어떤 포카를 찾으시나요?</h3>
        {/* <Button>상세검색</Button> */}
        {!isClicked ? (
          <input />
        ) : (
          
          <div>
            <SearchContainer>
              <div>
                <RadioButton onChange={onExchangeChange} />
              </div>
                <input />
              <div className="group">
                <label>그룹명</label>
                <SearchBar />
              </div>
              <div>
                <td>
                  <label>보유한 멤버</label>
                  <SearchBar />
                </td>
                {isExchange && (
                  <td>
                    <label>찾는 멤버</label>
                    <SearchBar />
                  </td>
                )}
              </div>
              <div>
                <label>포토카드 종류</label>
                <SearchBar />
                <Button>검색</Button>
              </div>
            </SearchContainer>
          </div>
          
        )}
      </div>
    </section>
  );
};

export default Search;