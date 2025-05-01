
import { Card, CardBody, Stack, Flex, Text, Icon, Stat, StatNumber, StatHelpText, StatArrow } from '@chakra-ui/react'
import PropTypes from 'prop-types'

export default function StatCard({ title, value, change, icon, color }) {
  const isPositive = change >= 0
  return (
    <Card bg='gray.100'>
      <CardBody>
        <Stack spacing={3}>
          <Flex justify="space-between" align="center">
            <Text fontSize="sm" color="gray.500">{title}</Text>
            <Icon as={icon} color={`${color}.400`} />
          </Flex>
          <Stat>
            <StatNumber>{value}</StatNumber>
            <StatHelpText>
              <StatArrow type={isPositive ? 'increase' : 'decrease'} />
              {Math.abs(change)}%
              <Text as="span" color="gray.500" ml={1}>
                {isPositive ? 'up' : 'down'} from last month
              </Text>
            </StatHelpText>
          </Stat>
        </Stack>
      </CardBody>
    </Card>
  )
}

StatCard.propTypes = {
  title:  PropTypes.string.isRequired,
  value:  PropTypes.string.isRequired,
  change: PropTypes.number.isRequired,
  icon:   PropTypes.elementType.isRequired,
  color:  PropTypes.string.isRequired,
}
