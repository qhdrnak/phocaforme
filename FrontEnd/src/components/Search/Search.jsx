import { useState } from "react";
import GroupDropdown from "./GroupDropdown.jsx";
import MemberDropdown from "./MemberDropdown.jsx";
import AlbumInput from "./AlbumInput.jsx";
import { Button } from "../UI/Button.jsx";
import RadioButton from "../UI/RadioButton.jsx";
// import styled from 'styled-components';
import { styled } from "@mui/system";

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
  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
  };
  const StyledInput = styled("input")(
    ({ theme }) => `
		font-size: 0.875rem;
		font-family: inherit;
		font-weight: 400;
		line-height: 1.5;
		color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
		background: inherit;
		border: none;
		border-radius: inherit;
		padding: 8px 12px;
		outline: 0;
		flex: 1 0 auto;
	`
  );

  return (
    <section id="user-input">
      <div>
        <h3 onClick={onClick}>어떤 포카를 찾으시나요?</h3>
        {/* <Button>상세검색</Button> */}
        {!isClicked ? (
          <input />
        ) : (
          <div>
            <div>
              <RadioButton onChange={onExchangeChange} />
            </div>
            <input />
            <div className="group">
              <label>그룹명</label>
              <GroupDropdown />
            </div>
            <div>
              <td>
                <label>보유한 멤버</label>
                <MemberDropdown />
              </td>
              {isExchange && (
                <td>
                  <label>찾는 멤버</label>
                  <MemberDropdown />
                </td>
              )}
            </div>
            <div>
              <label>포토카드 종류</label>
              <AlbumInput />
              <Button>확인</Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Search;
