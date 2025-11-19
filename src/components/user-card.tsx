export function UserCard({name, role, avatarUrl, isOnline} : {name: string, role: string, avatarUrl: string, isOnline: boolean}) {
  return (
    <div className='user-card'>
      <div className="avatar-section">
        <img src={avatarUrl} alt={`Аватар ${name}`} />
        <p>Статус: {isOnline ? 'online' : 'offline' }</p>
      </div>
      <div>
        <div className="user-info">
          <h3>{name}</h3>
          <p>{role}</p>
        </div>
      </div>
    </div>
  )
}