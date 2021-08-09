package b206.cook.domain.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.util.Assert;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
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
        this.report = 0;
        this.food = food;
        this.member = member;
    }

    // Update
    public void update(String content, String imgURL) {
        this.content = content;
        this.imgURL = imgURL;
    }
    public void addReport() {
        this.report ++;
    }

    // Delete
    public void delete() {
        
    }
}
