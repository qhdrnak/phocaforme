create table user
(
    user_id     CHAR(50) primary key not null,
    #     foreign key (user_id) references user_device (user_id),
    user_name   CHAR(20) not null,
    kakao_id    VARCHAR(50) unique,
    email       VARCHAR(100) unique,
    nickname    VARCHAR(50) unique,
    bias_id     BIGINT,
    created_at  TIMESTAMP not null default current_timestamp,
    updated_at  TIMESTAMP not null default current_timestamp,
    oauth_type  VARCHAR(50)
);

create table user_device
(
    user_id CHAR(50) primary key not null,
    user_device_token CHAR(100) unique,
    created_at  TIMESTAMP not null default current_timestamp,
    updated_at  TIMESTAMP not null default current_timestamp
);

create table barter_chat_room
(
    barter_chat_room_id        BIGINT primary key not null auto_increment,
    barter_board_id            BIGINT,
    foreign key (barter_board_id) references Barter (barter_board_id),
    barter_owner_id            CHAR(50),
    barter_visitor_id          CHAR(50),
    foreign key (barter_visitor_id) references user (user_id),
    barter_board_title         varchar(255),
    barter_latest_chat         BIGINT,
    barter_owner_latest_chat   BIGINT,
    barter_visitor_latest_chat BIGINT,
    barter_room_created_at     TIMESTAMP not null default CURRENT_TIMESTAMP,
    barter_chat_room_delete    boolean default false
);

create table barter_chat_messages
(
    barter_chat_id          BIGINT primary key not null auto_increment,
    barter_chat_room_id     BIGINT             not null,
    foreign key (barter_chat_room_id) references barter_chat_room (barter_chat_room_id),
    barter_chat_message     TEXT,
    barter_chat_read_or_not boolean default false,
    barter_chat_created_at  TIMESTAMP not null default CURRENT_TIMESTAMP,
    barter_chat_sender_id   CHAR(50)            not null,
    foreign key (barter_chat_sender_id) references user (user_id),
    barter_chat_img_code    varchar(8200)
);