/* istanbul ignore file */

import React, { useState } from 'react'
import { Button, Header, Icon, Placeholder, Segment, Pagination, Menu, Dropdown, DropdownItemProps } from 'semantic-ui-react'
import { PaginationDto } from 'src/services'
import { PaginationMeta } from 'src/services/api'

const paginationLimitOptions: DropdownItemProps[] = [
  { value: 10, text: 10 },
  { value: 20, text: 20 },
  { value: 30, text: 30 },
]

interface ListWrapperProps {
  loading?: boolean
  error?: boolean
  pageMeta?: PaginationMeta
  onRetrieve?: (paginationDto: PaginationDto) => void
}

const ListWrapper: React.FC<ListWrapperProps> = (props) => {
  const [limit, setLimit] = useState(props.pageMeta?.limit ?? 10)

  const onLimitChange = (limit: number) => {
    setLimit(limit)
    props.onRetrieve?.({ page: 1, limit })
  }

  const onPageChange = (page: number) => {
    props.onRetrieve?.({ page, limit })
  }

  const placeholder = <Placeholder className='placeholderLine'>
    {Array.from({ length: 10 }).fill(null).map((_, i) => <Placeholder.Line key={i} length='full' />)}
  </Placeholder>

  const errorSegment = <Segment placeholder>
    <Header icon>
      <Icon icon='unlink' />
      Something went wrong
    </Header>
    <Button primary>Retry</Button>
  </Segment>

  if (props.loading) return placeholder
  if (props.error) return errorSegment

  const pageMeta = props.pageMeta

  return <>
    {props.children}
    {pageMeta && <Menu attached='bottom'>
      <Menu.Item fitted>
        <Pagination
          pointing
          secondary
          as='nav'
          defaultActivePage={pageMeta.currentPage}
          totalPages={pageMeta.totalPages}
          firstItem={{ content: <Icon name='angle double left' />, icon: true, disabled: pageMeta.currentPage === 1 }}
          prevItem={{ content: <Icon name='angle left' />, icon: true, disabled: pageMeta.currentPage === 1 }}
          ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
          nextItem={{ content: <Icon name='angle right' />, icon: true, disabled: pageMeta.currentPage === pageMeta.totalPages }}
          lastItem={{ content: <Icon name='angle double right' />, icon: true, disabled: pageMeta.currentPage === pageMeta.totalPages }}
          onPageChange={(_, data) => onPageChange(Number(data.activePage))}
        />
      </Menu.Item>
      {/* TODO: Accessibility */}
      <Dropdown
        role='button'
        className='link item'
        pointing='bottom'
        text={`${limit} / page`}
        options={paginationLimitOptions}
        value={limit}
        onChange={(_, data) => onLimitChange(Number(data.value))}
      />
    </Menu>}
  </>
}

export default ListWrapper
