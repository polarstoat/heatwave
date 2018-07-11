using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class WaterNeeders : MonoBehaviour {

    //messaures the current temp
    protected float currentTemp = 0;
    //the temp where the water needer will wither
    protected float witherTemp = 0;
    //the temp wehre the water needer will die a horrible death
    protected float maxTemp = 0;
    
    public Sprite normal;
    public Sprite wither;
    public Sprite dead;
 
    protected bool isLive = true;
    //bool for checking if they are getting water
    protected bool getATastyDrink = false;
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
            //check to see what state it is im (normal, withered or dead) It then loads the right sprite. Sprite to be changed with animation state some time in the future
            DecayState();
        }
        if (getATastyDrink == true)
        {
            //this doesnt really need to be its own function at this point, but other stuff might be added to being watered
            getWatered();
        }

        getATastyDrink = Input.GetKey("f") ? true : false;
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
    //So the children can set there decay values values
    protected virtual void SetWitherTemp(float x)
    {
        witherTemp = x;
    }
    protected virtual void SetMaxTemp(float x)
    {
        maxTemp = x;
    }

    protected void getWatered ()
    {
        //refreshes the temp
        currentTemp = 0;
    }

}
