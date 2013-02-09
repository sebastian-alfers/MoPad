<?php

namespace MoPad\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;
use MoPad\AdminBundle\Entity\Game;

/**
 * @package MoPad\AdminBundle\Controller
 * @author Janina Trost <janina.trost@student.htw-berlin.de>
 * 
 * @method getgamesAction()
 * @method getUniqueAppToken($token)
 */
class ApiController extends Controller
{
	/**
     *
     * deliver the JSON formatted game list
     *
	 * @Route("/getgames", name="_mopad_api_getgames")
	 *
	 * 
	 * @return Response with the JSON formatted game list 
	 */
	public function getgamesAction()
	{
		$games = $this->getDoctrine()->getRepository('MoPadAdminBundle:Game')->findAll();

        foreach($games as &$game){
            $game->setImageUrl($this->container->getParameter('rootUrl') . '/' .$game->getImageUrl());
            $game->setGameJsUrl($this->container->getParameter('rootUrl') . '/' .$game->getGameJsUrl());
        }

		$serializer = $this->get('jms_serializer');
		$gamestr = $serializer->serialize(array('games' => $games), 'json');
		
		$response = new Response($gamestr);
		$response->headers->set('Content-Type', 'application/json', 'charset=utf-8');
		$response->headers->set('Access-Control-Allow-Origin', '*');
		
		return $response;
	}

    /**
     * @Route("/uniqueAppToken/{token}", name="_generate_app_token")
     *
	 * @param token
     */
    public function getUniqueAppToken($token)
    {
        $response = new Response(json_encode(md5(microtime().$token)));
      	$response->headers->set('Content-Type', 'application/json', 'charset=utf-8');
        $response->headers->set('Access-Control-Allow-Origin', '*');

   		return $response;
    }
}