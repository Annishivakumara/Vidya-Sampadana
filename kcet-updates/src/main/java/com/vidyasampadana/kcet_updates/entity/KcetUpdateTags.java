package com.vidyasampadana.kcet_updates.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "KcetUpdateTags")
@NoArgsConstructor
@AllArgsConstructor
public class KcetUpdateTags {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "update_tagId")
    private  Long update_tagId;

    @Enumerated(EnumType.STRING)
    @Column(name = "update_tag")
    private  Tags tag;

    enum  Tags {
        KCET, VERIFICATION, ROUND1, ROUND2, ROUND3
    }
}
