using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class WaterNeeders : MonoBehaviour {


    protected int currentTemp = 0;
    protected int witherTemp = 0;
    protected int maxTemp = 0;
    protected bool isLive = true;
	// Use this for initialization
	void Start ()
    {
        DecayState();
    }


    // Update is called once per frame
    void  Update()
    {
        currentTemp++;
        while (isLive == true)
        {
            DecayState();
        }
	}

    protected virtual void DecayState()
    {
        if (currentTemp < witherTemp)
        {

        }
        else if (currentTemp >= witherTemp && currentTemp < maxTemp)
        {

        }
        else if (currentTemp >= maxTemp)
        {
            isLive = false;
        }
    }
}
