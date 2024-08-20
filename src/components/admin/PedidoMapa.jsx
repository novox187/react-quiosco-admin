import React from 'react'
import MapaRepartidor from '../MapaLeaflet/MapaRepartidor'
import { Card } from '@nextui-org/react'

export default function PedidoMapa() {
    return (
        <div className='w-full' style={{ height: 'calc(100dvh - 10rem)' }}>
            <Card className='w-full ' style={{ height: 'calc(100% - 10rem)' }}>
                <MapaRepartidor />
            </Card>
        </div>
    )
}
