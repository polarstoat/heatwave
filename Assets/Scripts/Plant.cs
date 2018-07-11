using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Plant : WaterNeeders
{
    public float witherSeconds = 14;
    public float healthSeconds = 20;
    private float witherCalc = 0;
    private float healthCalc = 0;


    void Start()
    {
        // This is so the input comes out in seconds, making it easier for humans to use
     witherCalc = witherSeconds / Time.fixedDeltaTime;
     healthCalc = healthSeconds / Time.fixedDeltaTime;
     SetWitherTemp(witherCalc);
     SetMaxTemp(healthCalc);
    }
    
}
