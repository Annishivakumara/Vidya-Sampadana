package com.vidyasampadana.chat_service.controllers;

import com.vidyasampadana.chat_service.entity.Message;
import com.vidyasampadana.chat_service.entity.Room;
import com.vidyasampadana.chat_service.repository.RoomRepository;
import lombok.Getter;
import org.apache.coyote.Request;
import org.jboss.logging.Messages;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rooms")

public class RoomController {

    private RoomRepository roomRepository;

    public RoomController(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    //create  room
    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody  String roomId){
        if(roomRepository.findByRoomId(roomId)!=null){
           // room alredy exists
            return ResponseEntity.badRequest().body("Room Alredy Exists!!");
        }
        // create
        Room room= new Room();
        room.setRoomId(roomId);
        Room savedRoom=roomRepository.save(room);
       return ResponseEntity.status(HttpStatus.CREATED).body(room);
    }
    // get room
    @GetMapping("/{roomId}")
    public ResponseEntity<?> joinRoom(@PathVariable String roomId){
        Room room=roomRepository.findByRoomId(roomId);
        if(room==null){
            return ResponseEntity.badRequest().body("Room Not Found!!");
        }
        // join Room
        return ResponseEntity.ok(room);
    }
    //get messages of the room
    @GetMapping("/{roomId}/messages")
    public ResponseEntity<List<Message>>  getMessages(
            @PathVariable String roomId,
            @RequestParam(value="page", defaultValue = "0", required = false)
            int page,
            @RequestParam(value="size", defaultValue = "20",required = false )
            int size
            ){
            Room room=roomRepository.findByRoomId(roomId);
            if(room==null){
                return ResponseEntity.badRequest().build();
            }
            // get messages
            //pagination — it loads the newest messages first, like WhatsApp or
            // any chat app where you scroll up to see older messages.
            List<Message> messages= room.getMessages();
            int start=Math.max(0, messages.size())-(page+1)*size;
            int end=Math.min(messages.size(), start+size);
            List<Message> paginationMessages=messages.subList(start,end);
        return ResponseEntity.ok(paginationMessages);
    }
}
