import { useEffect, useState } from 'react'
import { useClient } from '../hooks/use-client'
import { Grid, Row } from '@zendeskgarden/react-grid'
import styled from 'styled-components'
import Timeline from '../components/timeline'
import Search from '../components/search'
import { TrialStatus } from '../components/trial-status'

const TicketSideBar = () => {
  const client = useClient()
  const [searchTerm, setSearchTerm] = useState<string>('')
  useEffect(() => {
    const getRequester = async () => {
      const requester = await client.get('ticket.requester')
      setSearchTerm(requester['ticket.requester'].email)
    }
    getRequester()
  }, [client])

  const handleNewInstance = (params?: URLSearchParams) => {
    client.invoke('instances.create', {
      location: 'modal',
      url: `${import.meta.env.VITE_ZENDESK_LOCATION}?${params?.toString()}`,
      size: {
        width: '650px',
        height: '400px'
      }
    })
  }

  useEffect(() => {
    client.invoke('resize', { width: '100%', height: '550px' })
  }, [client])

  return (
    <GridContainer>
      <>
        <TrialStatus />
        <Search
          initialSearch={searchTerm}
          onSubmit={setSearchTerm}
          style={{
            width: '100%',
            position: 'sticky',
            top: '0',
            backgroundColor: 'white',
            zIndex: 10,
            paddingBottom: '10px'
          }}
        />
        <Timeline address={searchTerm} emailViewHandler={handleNewInstance} />
      </>
    </GridContainer>
  )
}

const GridContainer = styled(Grid)`
  display: grid;
`

export default TicketSideBar
