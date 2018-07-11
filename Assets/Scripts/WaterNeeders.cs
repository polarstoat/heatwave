using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class WaterNeeders : MonoBehaviour {


    protected float currentTemp = 0;
    protected float witherTemp = 0;
    protected float maxTemp = 0;
    public Sprite normal;
    public Sprite wither;
    public Sprite dead;
    protected bool isLive = true;
	// Use this for initialization
	void Start ()
    {
        DecayState();
    }


    // Update is called once per frame
    private void FixedUpdate()
    {
        currentTemp++;
        if (isLive == true)
        {
            DecayState();
        }
	}

    protected virtual void DecayState()
    {
        if (currentTemp < witherTemp)
        {
            this.gameObject.GetComponent<SpriteRenderer>().sprite = normal;
        }
        else if (currentTemp >= witherTemp && currentTemp < maxTemp)
        {
            this.gameObject.GetComponent<SpriteRenderer>().sprite = wither;
        }
        else if (currentTemp >= maxTemp)
        {
            this.gameObject.GetComponent<SpriteRenderer>().sprite = dead;
            isLive = false;
        }
    }

    protected virtual void SetWitherTemp(float x)
    {
        witherTemp = x;
    }
    protected virtual void SetMaxTemp(float x)
    {
        maxTemp = x;
    }


}
