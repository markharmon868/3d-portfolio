import { GarnettVideo } from "./GwheelVideo"
import { SkateVideo } from "./SkateVideo"
import { Text } from "@react-three/drei";


export const Blender = () => {

    return (
        <>
            <GarnettVideo position={[-68,9,-28]} rotation = {[0,Math.PI * 0.6,0]} scale = {[2,2,2]}/>
            <SkateVideo position={[-65,9,-40]} rotation = {[0,Math.PI * 0.3,0]} scale = {[3,3,3]}/>
            <Text 
                position={[-66,9.6,-35]} 
                rotation = {[0,Math.PI * 0.46,0]} 
                fontSize={0.5}
                color="white"
                anchorX="center"
                anchorY="middle"
                maxWidth={7}
                outlineWidth={0.1}
                outlineColor="black"
                textAlign="center"
            >
                My love for 3D all started with Blender. These are some of my animations. Also everything else in this wrold was made by my in Blender.
            </Text>
        </>
    )

}