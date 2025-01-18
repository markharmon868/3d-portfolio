import { Eml } from "./EML/Eml";
import { useGLTF } from "@react-three/drei";
import { SaloonStandoff } from "./saloonStandoff/SaloonStandoff";
import { Studios } from "./EMLx/Studio";
import { GarnettVideo } from "./Blender/GwheelVideo";
import { SkateVideo } from "./Blender/SkateVideo";
import { Blender } from "./Blender/Blender";

const path = "/models/signs.glb";

export const Pullouts = () => {

    const { scene } = useGLTF(path);

    return (
        <>
            <Eml />
            <primitive object={scene} />
            <SaloonStandoff />
            <Studios />
            {/* <GarnettVideo position={[-68,9,-28]} rotation = {[0,Math.PI * 0.6,0]} scale = {[2,2,2]}/>
            <SkateVideo position={[-68,9,-40]} rotation = {[0,Math.PI * 0.3,0]} scale = {[3,3,3]}/> */}
            <Blender />
        </>
        
    
    );W
}