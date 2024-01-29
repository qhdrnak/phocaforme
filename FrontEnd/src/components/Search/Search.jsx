import { useState } from "react";
import { Button } from "../UI/Button.jsx";
// import styled from 'styled-components';
import { styled } from "@mui/system";
import { Container } from "@mui/material";
import { addSearchData } from "../../store2/search.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import RadioButton2 from "../UI/RadioButton.jsx";
import SearchBar from "./SearchBar.jsx";
import BarterWrite from "../../components/PostWrite/BarterWrite.jsx";
import SellWrite from "../../components/PostWrite/SellWrite.jsx";
import TypeDropdown from "../UI/Dropdown/TypeDropdown.jsx";

const Search = function () {
  const [userInput, setUserInput] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [isExchange, setIsExchange] = useState(true);
  const [targetMembers, setTargetMembers] = useState([]);
  const [ownMembers, setOwnMembers] = useState([]);
  const [cardType, setCardType] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTypeChange = (cardType) => {
    if (cardType == null) {
      cardType = {
        value: "",
        label: "",
      };
    }
    setCardType(cardType);
  };

  const handleUserInputChange = (event) => {
    setUserInput(event.target.value)
  }

  function onClick() {
    setIsClicked((prevIsClicked) => !prevIsClicked);
  }

  const handleOwnMemberSelection = (members) => {
    setOwnMembers(members);
  };

  const handleTargetMemberSelection = (members) => {
    setTargetMembers(members);
  };

  function onExchangeChange(value) {
    setIsExchange(value === "option1");
  }

  function handleSearchClick () {
    const searchData = {
      ownMembers: ownMembers[0].value,
      targetMembers: targetMembers[0].value,
      cardType: cardType.value
    }

    console.log(searchData)
    dispatch(addSearchData(searchData));
    navigate("/post");
  }


  return (
    // <section id="user-input">

    <div>
      <h3 onClick={onClick}>어떤 포카를 찾으시나요?</h3>
      {/* <Button>상세검색</Button> */}
      {!isClicked ? (
        <div id="title-container">
        <input
          id="title-input"
          value={userInput}
          onChange={handleUserInputChange}
          variant="outlined"
          placeholder="앨범명, 버전명을 입력하세요"
        />
      </div>
      ) : (
        
          <Container>
              <div id="write-radio-container">
                <RadioButton2 onChange={onExchangeChange} />
              </div>
              <div id="title-container">
                <input
                  id="title-input"
                  value={userInput}
                  onChange={handleUserInputChange}
                  variant="outlined"
                  placeholder="앨범명, 버전명을 입력하세요"
                />
              </div>
              <div id="group-member-input">
                {isExchange ? (
                  <BarterWrite
                    onChange={(ownMembers, targetMembers) => {
                      handleOwnMemberSelection(ownMembers);
                      handleTargetMemberSelection(targetMembers);
                    }}
                  />
                ) : (
                  <SellWrite />
                )}
              </div>
              <div id="card-input">
                <h3>포토카드 종류</h3>
                <TypeDropdown
                  onChange={(type) => {
                    handleTypeChange(type);
                  }}
                />
              </div>
              <Button onClick={handleSearchClick}>검색</Button>
          </Container>
        
      )}
    </div>
    // </section>
  );
};

export default Search;
