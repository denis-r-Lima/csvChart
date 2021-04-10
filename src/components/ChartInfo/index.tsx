import React from 'react'

import { Editable, Table, Td , Th} from './styles';

interface Marker {
    xAxis: string
    [key: string]: any
  }

interface Props{
    marker: Marker[]
}

const ChartInfo: React.FC<Props> = ({ marker }) => {
  return (
      <Table>
          <tbody>
            <tr>
                <Th colSpan={2}>
                    <h3>Chart Information</h3>
                </Th>
            </tr>
            <tr>
                <Td>Well name</Td>
                <Td><Editable contentEditable={true} spellCheck={false}/></Td>
            </tr>
            <tr>
                <Td>Date</Td>
                <Td><Editable contentEditable={true} spellCheck={false}/></Td>
            </tr>
            <tr>
                <Td>Assy ID</Td>
                <Td><Editable contentEditable={true} spellCheck={false}/></Td>
            </tr>
            <tr>
                <Td>Serial # under test</Td>
                <Td><Editable contentEditable={true} spellCheck={false}/></Td>
            </tr>
            <tr>
                <Td>Part # under test</Td>
                <Td><Editable contentEditable={true} spellCheck={false}/></Td>
            </tr>
            <tr>
                <Td>Procedure # and Rev</Td>
                <Td><Editable contentEditable={true} spellCheck={false}/></Td>
            </tr>
            <tr>
                <Td>Procedure step #</Td>
                <Td><Editable contentEditable={true} spellCheck={false}/></Td>
            </tr>
            <tr>
                <Td>Pressure test value(PSI)</Td>
                <Td><Editable contentEditable={true} spellCheck={false}/></Td>
            </tr>
            <tr>
                <Td>Start Pressure 1(PSI)</Td>
                <Td>{marker[0]? `${marker[0].Ch2} psi` : ''}</Td>
            </tr>
            <tr>
                <Td>End Pressure 2(PSI)</Td>
                <Td>{marker[1]? `${marker[1].Ch2} psi` : ''}</Td>
            </tr>
            <tr>
                <Td>Pressure Loss 1-2(PSI)</Td>
                <Td>{marker[0]  && marker[1] && `${marker[0].Ch2 - marker[1].Ch2} psi`}</Td>
            </tr>
            <tr>
                <Td>Pressure test duration 1-2(min)</Td>
                <Td><Editable contentEditable={true} spellCheck={false}/></Td>
            </tr>
            <tr>
                <Td>Start Pressure 3(PSI)</Td>
                <Td>{marker[2]? `${marker[2].Ch2} psi` : ''}</Td>
            </tr>
            <tr>
                <Td>End Pressure 4(PSI)</Td>
                <Td>{marker[3]? `${marker[3].Ch2} psi` : ''}</Td>
            </tr>
            <tr>
                <Td>Pressure Loss 3-4(PSI)</Td>
                <Td>{marker[2]  && marker[3] && `${marker[2].Ch2 - marker[3].Ch2} psi`}</Td>
            </tr>
            <tr>
                <Td>Pressure test duration 3-4(min)</Td>
                <Td><Editable contentEditable={true} spellCheck={false}/></Td>
            </tr>
            <tr>
                <Td>Transducer serial #</Td>
                <Td><Editable contentEditable={true} spellCheck={false}/></Td>
            </tr>
            <tr>
                <Td>Transduder due cal. date</Td>
                <Td><Editable contentEditable={true} spellCheck={false}/></Td>
            </tr>
          </tbody>
      </Table>
  )
}

export default ChartInfo;