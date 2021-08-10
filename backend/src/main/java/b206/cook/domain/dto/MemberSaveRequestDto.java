package b206.cook.domain.dto;

import b206.cook.domain.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberSaveRequestDto {

    private String nickname;
    private String snsType;
    private String profileImage;
    private String snsId;

    public MemberSaveRequestDto(String nickname, String snsType, String profileImage, String snsId) {
        this.nickname = nickname;
        this.snsType = snsType;
        this.profileImage = profileImage;
        this.snsId = snsId;
    }

    @Builder
    public MemberSaveRequestDto(Member member) {
        this.nickname = member.getNickname();
        this.snsType = member.getSnsType();
        this.profileImage = member.getProfileImage();
        this.snsId = member.getSnsId();
    }

    public Member toEntity() {
        return Member.builder()
                .nickname(this.nickname)
                .snsType(this.snsType)
                .profileImage(this.profileImage)
                .snsId(this.snsId)
                .build();
    }
}
