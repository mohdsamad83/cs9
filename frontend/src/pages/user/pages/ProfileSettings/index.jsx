import { useNavigate } from 'react-router-dom'
import Button from '../../../../components/Button/Button'

function ProfileSettingsPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-1 items-center justify-center p-10">
      <div className="text-center">
        <h2 className="font-display mb-2 text-[18px] font-semibold text-[#191c1d]">Profile Settings</h2>
        <p className="mb-6 text-[13px] text-[#444748]">Profile editing — coming soon.</p>
        <Button variant="secondary" onClick={() => navigate('/user')}>Back to Dashboard</Button>
      </div>
    </div>
  )
}

export default ProfileSettingsPage
