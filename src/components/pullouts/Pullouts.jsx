import { Eml } from "./EML/Eml";
import { useGLTF } from "@react-three/drei";
import { SaloonStandoff } from "./saloonStandoff/SaloonStandoff";
import { Studios } from "./EMLx/Studio";

const path = "/models/signs.glb";

export const Pullouts = () => {

    const { scene } = useGLTF(path);

    return (
        <>
            <Eml />
            <primitive object={scene} />
            <SaloonStandoff />
            <Studios />
        </>
        
    
    );
}