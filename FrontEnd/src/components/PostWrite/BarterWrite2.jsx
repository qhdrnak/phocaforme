import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import GroupDropdown2 from "../UI/Dropdown/GroupDropdown2.jsx";
import MemberDropdown2 from "../UI/Dropdown/MemberDropdown2.jsx";

import Chip from "@mui/material/Chip";

const BarterWrite2 = ({ onChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedGroup, setSelectedGroup] = useState(0);

  const loginUser = useSelector((state) => state.user.user);

  const handleGroupChange = (group) => {
    if (group) {
      setSelectedGroup(group);
      
    } else {
      setSelectedGroup(null);

    }
    // 그룹이 변경되었을 때 멤버와 입력값 초기화
    setOwnMembers([]);
    setTargetMembers([]);
    setOwnMembersInput("");
    setTargetMembersInput("");
  };

  const [ownMembers, setOwnMembers] = useState([]);
  const [targetMembers, setTargetMembers] = useState([]);

  const [ownMembersInput, setOwnMembersInput] = useState("");
  const [targetMembersInput, setTargetMembersInput] = useState("");

  /// 수정해야함
  const handleOwnMemberChange = (member) => {
    if (member) {
      setOwnMembers((prevOwnMembers) => [...prevOwnMembers, member]);
      onChange([...ownMembers, member], targetMembers);
      setOwnMembersInput(member.value);
    } else {
      setOwnMembersInput(ownMembersInput);
    }
  };

  const handleTargetMemberChange = (member) => {
    if (member) {
      setTargetMembers((prevTargetMembers) => [...prevTargetMembers, member]);
      onChange(ownMembers, [...targetMembers, member]);
      setTargetMembersInput(member.value);
    } else {
      setTargetMembersInput(targetMembersInput);
    }
  };

  // 멤버 삭제 관련
  const handleOwnMemberDelete = (deletedMember) => {
    setOwnMembers(ownMembers.filter((member) => member !== deletedMember));
  };

  const handleTargetMemberDelete = (deletedMember) => {
    setTargetMembers(
      targetMembers.filter((member) => member !== deletedMember)
    );
  };

  return (
    <div>
      <div id="group-input" className="search-box-group">
        <div className="searchbar-title">그룹명</div>
        <GroupDropdown2
          onChange={(group) => {
            handleGroupChange(group);
          }}
        />
      </div>
      <div id="member-input">
        <div id="own-member-dropdown">
          <div className="searchbar-title">보유한 멤버</div>

          <MemberDropdown2
            selectedGroup={selectedGroup}
            onChange={(member) => {
              handleOwnMemberChange(member);
            }}
          />
          <div>
            {ownMembers &&
              ownMembers.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag?.idolName}
                  variant="outlined"
                  onClick={() => handleOwnMemberDelete(tag)}
                  onDelete={() => handleOwnMemberDelete(tag)}
                  style={{
                    margin: "4px",
                    border: 0,
                    // backgroundColor: tag.color,
                    // color: "white",
                  }}
                />
              ))}
          </div>
        </div>
        <div>
          <div className="searchbar-title">찾는 멤버</div>

          <MemberDropdown2
            selectedGroup={selectedGroup}
            onChange={(member) => {
              handleTargetMemberChange(member);
            }}
          />
          <div>
            {targetMembers &&
              targetMembers.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag?.idolName}
                  variant="outlined"
                  onClick={() => handleTargetMemberDelete(tag)}
                  onDelete={() => handleTargetMemberDelete(tag)}
                  style={{
                    margin: "4px",
                    border: 0,
                    // backgroundColor: tag.color,
                    // color: "white",
                  }}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarterWrite2;
