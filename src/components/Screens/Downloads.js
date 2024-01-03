import React from 'react'
import '../../css/downloads.css'
import { useContext } from 'react'
import { Context } from '../../App'

import EKVCDownloads from './EKVC/Downloads'
import SEVCDownloads from './SEVC/Downloads'
function Downloads() {
    const { state } = useContext(Context)
    const event_type = state?.userdata?.event_type
    return (
        <>
            {
                event_type === "ekvc" ?
                    <EKVCDownloads /> : <SEVCDownloads />
            }
        </>
    )
}

export default Downloads
