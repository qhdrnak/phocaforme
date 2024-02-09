import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setBias } from "../../store2/loginUser.js";

import { Avatar, Button } from "@mui/material";

import GroupDropdown from "../UI/Dropdown/GroupDropdown2";
import MemberDropdown from "../UI/Dropdown/MemberDropdown2";

const Bias = () => {
  const dispatch = useDispatch();

  const [selectedGroup, setSelectedGroup] = useState(0);
  const [selectedMember, setSelectedMember] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleGroupChange = (group) => {
    if (group) {
      setSelectedGroup(group);
    } else {
      setSelectedGroup(null);

    }
    
  };

  const handleMemberChange = (member) => {
    setSelectedMember(member);
  };

  const generateImageUrl = (group, member) => {
    if (group && member) {
      return member.idolImage;
    }
    return null;
  };

  const handleApplyClick = () => {
    const url = generateImageUrl(selectedGroup, selectedMember);
    setImageUrl(url);

    dispatch(setBias([selectedGroup, selectedMember]));
    // member.idolMemberId 를 db 에 반영하기
  };

  return (
    <div className="profile-item-container">
      <h2 className="profile-title">최애 추가</h2>
      <div className="profile-dropdown-container">
        <div className="profile-group-container">
          <div>그룹명</div>
          <div>
            <GroupDropdown
              isProfile={true}
              onChange={(group) => {
                handleGroupChange(group);
              }}
            />
          </div>
        </div>
        <div id="bias-member-container">
          <div>멤버명</div>
          <div>
            <MemberDropdown
              isProfile={true}
              selectedGroup={selectedGroup}
              onChange={(member) => {
                handleMemberChange(member);
              }}
            />
          </div>
        </div>
      </div>
      <div>
        <Avatar id="bias-avatar" key={imageUrl} src={imageUrl} />
      </div>
      <div>
        <Button variant="contained" onClick={handleApplyClick}>
          적용
        </Button>
      </div>
    </div>
  );
};

export default Bias;
