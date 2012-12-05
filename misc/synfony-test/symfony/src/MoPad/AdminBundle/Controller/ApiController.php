<?php

namespace MoPad\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;
use MoPad\AdminBundle\Entity\Game;

class ApiController extends Controller
{
	/**
	 * @Route("/getgames", name="_mopad_api_getgames")
	 */
	public function getgamesAction()
	{
		$games = $this->getDoctrine()->getRepository('MoPadAdminBundle:Game')->findAll();
		
		$serializer = $this->get('jms_serializer');
		$gamestr = $serializer->serialize($games, 'json');
		
		$response = new Response($gamestr);
		$response->headers->set('Content-Type', 'application/json', 'charset=utf-8');
		
		return $response;
	}
}