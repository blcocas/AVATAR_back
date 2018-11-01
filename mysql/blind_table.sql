create table blind (
	user_id varchar(12) NOT NULL,
  user_pass varchar(12) NOT NULL,
  p_id int(6) auto_increment,
  primary key (user_id),
  foreign key (p_id) references person (pid)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
