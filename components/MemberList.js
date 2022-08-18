export default function MemberList({members}) {
    return (
        <div style={{marginTop:"20px"}}>
            {members.map((member) => {
                return (
                    <div style={{ display: "flex" }}>
                        <img key={member.id} src={member.user.profile_image} style={{ width: "2.5rem", height: "2.5rem", margin: "auto",marginLeft:"20px",marginRight:"20px", borderRadius: "50%" }} />
                        <p style={{ color: "white" }}>{member.user.name}</p>
                    </div>
                )
            })}
        </div>
    )
}