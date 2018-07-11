using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerMovement : MonoBehaviour {

    public float speed = 0.25f;
    private float xMove = 0;
    private float yMove = 0;
  


    private void Start()
    {

    }
     private void FixedUpdate()
     {
         var move = new Vector3(xMove, yMove, 0);
         transform.position += move * speed;
     } 

    
}
