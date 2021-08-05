package b206.cook.domain;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.util.Assert;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Article {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String imgURL;
    private int report;

    @CreationTimestamp
    private Date createdAt;

    @UpdateTimestamp
    private Date updatedAt;

    @ManyToOne
    @JoinColumn(name = "food_id")
    private Food food;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public Article(String content, String imgURL, Food food, Member member) {
        Assert.hasText(content,"한줄평을 작성해주세요." );
        this.content = content;
        Assert.hasText(imgURL, "이미지를 업로드 해주세요.");
        this.imgURL = imgURL;
        this.food = food;
        this.member = member;
    }

    // Update
    public void updateContent(String content){
        this.content = content;
    }
    public void updateImage(String imgURL){
        this.imgURL = imgURL;
    }
    public void addReport() {
        this.report ++;
    }
}
