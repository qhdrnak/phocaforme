import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import CloseIcon from "@mui/icons-material/Close";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Container } from "@mui/material";

import theme from "../../styles/theme";

function generate(element, index, isRead) {
  return React.cloneElement(element, {
    key: index,
    className: isRead ? "alarm-read-item" : "alarm-item",
  });
}

export default function InteractiveList() {
  const [readList, setReadList] = React.useState([false, false]);

  const readAlarm = (index) => {
    setReadList((preReadList) => {
      const newReadList = [...preReadList];
      newReadList[index] = !newReadList[index];
      return newReadList;
    });
  };

  return (
    <Container>
      <div>
        <h2>알림리스트</h2>
        <FormControlLabel
          id="alarm-check-all"
          control={
            <Checkbox
              checked={readList.every((item) => item)}
              onChange={() =>
                setReadList((preReadList) => preReadList.map(() => true))
              }
              disabled={readList.every((item) => item)}
            />
          }
          label="모두 읽음"
        />
      </div>

      <div>
        <List>
          {readList.map((isRead, index) =>
            generate(
              <ListItem
                secondaryAction={
                  <>
                    <span id="alarm-time">"alarmTimes"</span>
                    <IconButton edge="end" onClick={() => readAlarm(index)}>
                      {isRead ? null : <CloseIcon />}
                    </IconButton>
                  </>
                }
              >
                <ListItemAvatar>
                  {isRead ? <TaskAltIcon /> : <RadioButtonUncheckedIcon />}
                </ListItemAvatar>
                <ListItemText primary="{alarmTypes}" secondary="{alarmTexts}" />
              </ListItem>,
              index,
              isRead
            )
          )}
        </List>
      </div>
    </Container>
  );
}
