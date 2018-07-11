using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Plant : WaterNeeders
{
    public int witherHealth = 200;
    public int MaxHealth = 300;

    void Start()
    {
        SetWitherTemp(witherHealth);
        SetMaxTemp(MaxHealth);
    }
    
}
