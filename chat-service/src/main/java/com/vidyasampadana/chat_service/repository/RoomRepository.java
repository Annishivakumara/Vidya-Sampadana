package com.vidyasampadana.chat_service.repository;

import com.vidyasampadana.chat_service.entity.Room;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends MongoRepository<Room, String> {
    //get Room  By Id
    Room findByRoomId(String roomId);

}
