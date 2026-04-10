<!DOCTYPE html>
<html>

<head>
  <title></title>
  <meta charset="UTF-8">
  <meta name="description" content="Free Web tutorials">
  <meta name="keywords" content="HTML,CSS,XML,JavaScript">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  {{-- <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
      rel="stylesheet"> --}}
  <!-- bar -->
  <style>
        @page {
            /* margin: 0; */
            margin: 160px 0px 80px 0px; /* top right bottom left */
        }
        body {
            overflow-x: hidden;
            margin: 0;
        }

        header {
            position: fixed;
            top: -160px;
            left: 0px;
            right: 0px;
            height: 160px;
        }

        footer {
            position: fixed;
            bottom: -80px;
            left: 0px;
            right: 0px;
            height: 80px;
            text-align: center;
            font-size: 12px;
        }

        .watermark {
            position: fixed;
            top: 50%;
            left: 50%;

            transform: translate(-50%, -50%);

            opacity: 0.2; /* fade level */
            z-index: -1000;

            width: 500px; /* adjust as needed */
        }

        .content {
            padding-left: 17px;
            padding-right: 20px;
        }

  </style>
</head>

<body>

<div class="watermark">
    <img src="{{ public_path('logo.png') }}" width="100%">
</div>

<header>
    <table width="100%" cellpadding="0" cellspacing="0"
		style="font-family:Georgia, 'Times New Roman', serif;">

		<!-- TOP ROW -->
		<tbody>
			<tr style="padding-top: 30px">

				<!-- LOGO -->
				<td width="40%" style="vertical-align:center; padding-left: 10px">

					<table width="100%" cellpadding="0" cellspacing="0">
						<tbody>
							<tr>

								<td width="100%">
									<img src="{{ public_path("logo.png") }}" width="100">
								</td>

							</tr>
						</tbody>
					</table>

				</td>

				<!-- INVOICE TITLE -->
				<td width="60%" align="left" style="vertical-align:bottom;">

					<span style="font-size:36px;font-weight:bold;color:#1f3fa3;">
						INVOICE
					</span>

				</td>

			</tr>

		</tbody>
	</table>
	<table width="100%" cellpadding="0" cellspacing="0"
		style="font-family:Georgia, 'Times New Roman', serif;">

		<!-- TOP ROW -->
		<tbody>


			<!-- SECOND ROW -->
			<tr>

				<!-- STRIPES -->
				<td width="100%" style="vertical-align:bottom;">

					<table width="100%" cellpadding="0" cellspacing="0">

						<tbody>

							<tr>
								<td colspan="2" width="100%" height="6" style="background:#0c3b3b;"></td>
							</tr>

							<tr>
								<td colspan="2" height="2"></td>
							</tr>

							<tr>
								<td colspan="2" width="100%" height="6" style="background:#d6a32b;"></td>
							</tr>

							<tr>
								<td colspan="2" height="2"></td>
							</tr>

							<tr>
								<td colspan="2" width="100%" height="4" style="background:#e6c06a;"></td>
							</tr>

						</tbody>

					</table>

				</td>


				<!-- DATE + INVOICE -->
				<td
					style="vertical-align:top; text-align:right; padding-left: 5px; padding-right: 20px; white-space:nowrap;">

					<table width="100%" cellpadding="0" cellspacing="0">

						<tbody>
							<tr>
								<td width="100%"
									style="font-size:17px;font-weight:bold;text-align:right; white-space:nowrap;">
									Date # {{ date('d/m/Y') }}
								</td>
							</tr>

							<tr>
								<td width="100%"
									style="font-size:17px;font-weight:bold;text-align:right; white-space:nowrap;">
									Invoice No # WAM{{$order->id}}
								</td>
							</tr>

						</tbody>
					</table>

				</td>

			</tr>

		</tbody>
	</table>
</header>

<footer>
		<table width="100%" cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; color:#274a4d;">

			<tr>

				<!-- LEFT ADDRESS -->
				<td width="55%" style="font-size:15px; font-weight:bold; vertical-align:middle; padding-left: 17px">
					125 TOWNPARK DR NW STE 300 ,<br>
					KENNESAW, GA 30144
				</td>

				<!-- RIGHT CONTACT -->
				<td width="45%" align="right">

					<table cellpadding="4" cellspacing="0" style="font-size:12px; color:#274a4d;">

						<tr>
							<td width="25" align="center">
								<img src="{{ public_path('icons/phone.png') }}" width="16">
							</td>
							<td style="font-weight:bold;">
								888-892-0989
							</td>
						</tr>

						<tr>
							<td align="center">
								<img src="{{ public_path('icons/web.png') }}" width="16">
							</td>
							<td>
								www.wisemanautomart.com
							</td>
						</tr>

						<tr>
							<td align="center">
								<img src="{{ public_path('icons/mail.png') }}" width="16">
							</td>
							<td>
								service@wisemanautomart.com
							</td>
						</tr>

					</table>

				</td>

			</tr>

		</table>
	</footer>

<div class="content">
    <table width="100%" cellspacing="0" cellpadding="6" style="border-collapse:collapse;border:1px solid #000;">
		<tr style="background-color:#1f3864; color: white;">
			<td width="50%" style="text-align:center;border-right:1px solid #000;font-weight:bold;">BILL TO</td>
			<td width="50%" style="text-align:center;font-weight:bold;">SHIP TO</td>
		</tr>
		<tr>
			<td style="border-right:1px solid #000;border-top:1px solid #000;"> <b>{{$order->quotation->name}}</b><br> {{$order->quotation->billing_address}}<br> <span
					style="color:#1a5fb4;text-decoration:underline;">{{$order->quotation->email}}</span><br> {{$order->quotation->country_code . ' ' . $order->quotation->phone}} </td>
			<td style="border-top:1px solid #000;"> <b>{{$order->quotation->name}}</b><br> {{$order->quotation->shipping_address}}<br> <span
					style="color:#1a5fb4;text-decoration:underline;">{{$order->quotation->email}}</span><br> {{$order->quotation->country_code . ' ' . $order->quotation->phone}} </td>
		</tr>
	</table> <br>
	<table width="100%" cellspacing="0" cellpadding="6" style="border-collapse:collapse;border:1px solid #000;">
		<tr style="background-color:#1f3864; color: white;">
			<td width="65%" style="text-align:center;border-right:1px solid #000;font-weight:bold;">PART DESCRIPTION</td>
			<td width="15%" style="text-align:center;border-right:1px solid #000;font-weight:bold;">TAXED</td>
			<td width="20%" style="text-align:center;font-weight:bold;">AMOUNT</td>
		</tr>
		<tr>
			<td style="border-top:1px solid #000; vertical-align:top;">
				<table width="100%" cellspacing="0" cellpadding="2">
					<tr>
						<td width="100">Year</td>
						<td width="10">:</td>
						<td>{{$order->quotation->part_year}}</td>
					</tr>
					<tr>
						<td>Make</td>
						<td>:</td>
						<td>{{$order->quotation->part_make}}</td>
					</tr>
					<tr>
						<td>Model</td>
						<td>:</td>
						<td>{{$order->quotation->part_model}}</td>
					</tr>
					<tr>
						<td>Part</td>
						<td>:</td>
						<td>{{$order->quotation->part_name}}</td>
					</tr>
					<tr>
						<td>Description</td>
						<td>:</td>
						<td>{{$order->quotation->part_description}}</td>
					</tr>
					<tr>
						<td>VIN</td>
						<td>:</td>
						<td>{{$order->quotation->part_vin}}</td>
					</tr>
					<tr>
						<td>Warranty</td>
						<td>:</td>
						<td>{{$order->quotation->part_warranty}} Months</td>
					</tr>
				</table>
			</td>
			<td style="border-left:1px solid #000;border-top:1px solid #000;text-align:center;vertical-align:middle;">
				Yes </td>
			<td style="border-left:1px solid #000;border-top:1px solid #000;text-align:center;vertical-align:middle;">
				${{$order->quotation->sale_price}} </td>
		</tr>
		<tr style="background-color:#1f3864; color: white;">
			<td style="text-align:center;border-right:1px solid #000;border-top:1px solid #000;border-bottom:1px solid #000;font-weight:bold;">OTHER COMMENTS</td>
			<td style="text-align:center;background:#ffffff;color:#000;border-left:1px solid #000;border-top:1px solid #000;border-bottom:1px solid #000;font-weight:bold;">Subtotal</td>
			<td style="text-align:center;background:#ffffff;color:#000;border-left:1px solid #000;border-top:1px solid #000;border-bottom:1px solid #000;font-weight:bold;">${{$order->quotation->sale_price}}</td>
		</tr>
		<tr>
			<td style="vertical-align:top;">
				<ol style="margin:0;padding-left:18px;">
					<li style="font-size:15px;">Turnaround time for Part Delivery is 5 to 7 Business Days.</li>
					<li style="font-size:15px;">Any order over $1000.00, Customer will have to share the Credit Card Copy and a Valid ID proof.
					</li>
				</ol>
			</td>
			<td style="text-align:center;border-left:1px solid #000;border-top:1px solid #000;border-bottom:1px solid #000;font-weight:bold;">Taxable</td>
			<td style="border-left:1px solid #000;text-align:center;border-top:1px solid #000;border-bottom:1px solid #000;font-weight:bold;">{{$order->quotation->sales_tax}}%</td>
		</tr>
		<tr>
			<td></td>
			<td style="text-align:center;border-left:1px solid #000;border-top:1px solid #000;border-bottom:1px solid #000;font-weight:bold;">OTP Fee</td>
			<td style="border-left:1px solid #000;text-align:center;border-top:1px solid #000;border-bottom:1px solid #000;">-</td>
		</tr>
		<tr>
			<td></td>
			<td style="text-align:center;border-left:1px solid #000;border-top:1px solid #000;border-bottom:1px solid #000;font-weight:bold;">Tax due</td>
			<td style="border-left:1px solid #000;text-align:center;border-top:1px solid #000;border-bottom:1px solid #000;">-</td>
		</tr>
		<tr>
			<td></td>
			<td style="text-align:center;border-left:1px solid #000;border-top:1px solid #000;border-bottom:1px solid #000;font-weight:bold;">Due</td>
			<td style="border-left:1px solid #000;text-align:center;border-top:1px solid #000;border-bottom:1px solid #000;">-</td>
		</tr>
		<tr>
			<td></td>
			<td style="text-align:center;border-left:1px solid #000;border-top:1px solid #000;border-bottom:1px solid #000;font-weight:bold;">TOTAL</td>
			<td style="border-left:1px solid #000;font-weight:bold;text-align:center;">${{$order->quotation->sale_price}}</td>
		</tr>
	</table> <br>
	<p style="color:#cc0000;font-style:italic;font-weight:bold;text-align:center;"> “Please read all of our terms and
		conditions in this file before signing to avoid any miscommunication or disruption” </p>
	<p style="text-align:justify;font-size:13px;"> <b>NOTE:</b> YOU HAVE AGREED TO BUY AN “USED OEM PART”. ALL PURCHASED AUTO
		PARTS ARE SUBJECT TO ACCEPTANCE BY DISMANTLER AND ARE SUBJECT TO A 25% HANDLING CHARGE IF ACCEPTED BY SELLER.
		RETURNS ARE ACCEPTED ONLY AT SELLERS OPTIONS AS PER THE PROVIDED WARRANTY ONLY. WARRANTY IS VOIDED IF THE PARTS
		ARE NOT RETURNED TO US IN THE SAME CONDITION IN WHICH THEY WERE SOLD. ALL RETURNS ARE SUBJECT TO A 25%
		RESTOCKING FEES AND ARE AT THE SOLE DESCRIPTION OF THE SELLER. RETURNING THE PART IS THE RESPONSIBILITY OF THE
		CUSTOMER AT THEIR EXPENSE. RETURN SHIPPING COSTS WILL NOT BE REIMBURSED. THIS SALE AGREEMENT IS GOVERNED BY THE
		LAWS OF THE STATE OF GEORGIA AND YOU HEREBY CONSENT TO THE EXCLUSIVE JURISDICTION AND VENUE OF THE COURTS OF
		GEORGIA FOR ALL DISPUTES. TERMS AND CONDITIONS OF SALE READ AND AGREED. </p> <br><br>
	<table width="100%">
		<tr>
			<td width="50%"> Date: __________________________ </td>
			<td width="50%" style="text-align:right;"> Signature: __________________________ </td>
		</tr>
	</table>
    <p style="text-align:justify;font-size:15px;"> <b>NOTE:</b> By signing this invoice you agreed to buy a “Used OEM Part” and bind by our terms and conditions.
This sale agreement is governed by the laws of the state of Georgia and you hereby consent to the exclusive
jurisdiction and venue of the courts in Georgia for all disputes. Terms and conditions of sale read and agreed. </p>
    <p style="text-align:justify;font-size:15px;"> <b>Terms & Conditions:</b></p>
    <ul>
        <li style="font-size:15px;">Part Warranties are limited to manufacturing defects. We do not warranty any attached accessory parts,
such as switches, sensors, cables, electronics, belts, hoses, wire harnesses, valve covers, brackets,
flywheel or any electrical part which is not part of the core engine as defined above.</li>
        <li style="font-size:15px;">In the event of a warranty claim, a part diagnostic report is required from a certified automotive facility.
We are not responsible for improper installation and labour charges.</li>
        <li style="font-size:15px;">All returned parts or cancelled orders are subjected to 25% processing charge and freight both ways,
regardless of the reason, this also applies to any miss-ordered or miss-diagnosed parts order placed by the
customer.</li>
        <li style="font-size:15px;">We do not assume towing, shipping, transportation or any rental cost.</li>
        <li style="font-size:15px;">Usual delivery time is about 5 to 7 working days, but due to some unusual circumstances please allow us
some additional time.</li>
        <li style="font-size:15px;">All residential deliveries incur shipping charges (charges may vary according to the part & shipping
address) unless agreed to otherwise.</li>
        <li style="font-size:15px;">Extended warranty will be activated upon notification of the installation of the part.</li>
        <li style="font-size:15px;">The part must be installed within 10 days of the delivery date. Warranty coverage begins on the date the
order is placed. Exchanges or faulty part claims can be done only after the part has been in customer
possession for more than 10 to 30 days.</li>
        <li style="font-size:15px;">Although we (Wiseman Auto) make every effort to make the part look as nice as possible before it ships,
no warranty or guarantee is made towards the appearance of that part.</li>
        <li style="font-size:15px;">Make sure to inspect all parts before signing for them on delivery.</li>
        <li style="font-size:15px;">The stated mileage is not guaranteed and is correct to the best of our knowledge.</li>
        <li style="font-size:15px;">We do not warranty oil leaks/ damage incurred on your own before fitting due to non-replaceable seals,
gaskets, or filters.</li>
        <li style="font-size:15px;">OEM Used Auto Parts are interchangeable with multiple years, makes and models, which means the
same part is an exact fit for multiple makes and models as determined by OEM standards. We guarantee
the part we sell to fit your vehicle. All deposits are non-refundable and any part is returned not in the
same assembled condition as it was received will not be refunded under any circumstances. If the
delivered part is disassembled in any way without our expert written authorization it will void the
warranty.</li>
        <li style="font-size:15px;">If you were charged a core fee you will not be refunded if there are cracks or holes in the block or head or
if the part is disassembled or if not returned within the 30 days.</li>
        <li style="font-size:15px;">Since these are used auto parts, the Warranty Period provided is applicable only for the parts sold by
Wiseman Automart. (Warranty is not Applicable for any Vehicle or Any other parts associated with the
Vehicle)</li>
        <li style="font-size:15px;">In case of any Disaster/Accident/Damage to the Vehicle or Any Individual associated with the vehicle,
Wiseman Automart is not Responsible/Liable for any losses incurred as these are used auto parts.</li>
    </ul>
<p style="text-align:justify;font-size:15px;"> <b>Electrical Parts:</b></p>
    <ul>
        <li style="font-size:15px;">All electric parts are OEM parts that will match with the exact VIN provided and sold as is.</li>
        <li style="font-size:15px;">Electrical items such as ABS Control Modules, Engine Control Modules (ECM), Body Control Modules
(BCM), and Transmission Control Modules (TCM) are only guaranteed to match based on the customer's
VIN number and are not offered for testing reasons.</li>
        <li style="font-size:15px;">If necessary, modules may need to be reprogrammed by the vendor. If this is needed, the part cannot be
returned until the Dealer confirms that it has been properly reprogrammed. Electrical components that have
been altered in any way are not refundable.</li>
        <li style="font-size:15px;">However used modules are subjected to be reprogrammed and re-flashed if required before or after installing,
but no refund quoting the reason part is not re-programmed or re-flashed.</li>
</ul>
<p style="text-align:justify;font-size:15px;"> <b>Transmission:</b></p>
    <ul>
        <li style="font-size:15px;">We guarantee that it will shift correctly, that the gears will be in good condition, and that the bearings
will be in good condition.</li>
        <li style="font-size:15px;">Before assembly, thoroughly clean all gearbox components, including the oil pan</li>
        <li style="font-size:15px;">In all automatic gearboxes, change the oil and filter. Prior to assembly, you must replace ALL seals and
gaskets. Test the cooler and pipes for flushing and flow</li>
        <li style="font-size:15px;">In the front pump, fully activate the torque converter.</li>
        <li style="font-size:15px;">If you have a manual gearbox, you must replace the clutch, pressure plate, and slave cylinder. Prior to
fitting, your fly wheel must also be turned.</li>
        <li style="font-size:15px;">Fill and test the fluid to ensure correct levels.</li>
</ul>
<p style="text-align:justify;font-size:15px;"> <b>Engines:</b></p>
    <ul>
        <li style="font-size:15px;">Engines comes with full assembly, that include manifolds, oil pans, timing belts and covers, fuel injection
or carburettor, and only the long block is guaranteed.</li>
        <li style="font-size:15px;">Any engine accessories or secondary components are not included or warranted when an engine is sold or
warranted. Accessory parts will be covered by warranty if bought separately.</li>
</ul>
<p style="text-align:justify;font-size:15px;"> <b>Cylinder Head:</b></p>
    <ul>
        <li style="font-size:15px;">Cylinder heads are assured to be warped or cracked free of defects. It is possible that rings and valves will need
to be re-machined.</li>
</ul>
<p style="text-align:justify;font-size:15px;"> <b>Warranty Policy:</b></p>
    <ul>
        <li style="font-size:15px;">This warranty applies only to the purchased used part. This warranty shall not apply to or include the
following: Repair or replacement is required as a result of any accident or misuse</li>
        <li style="font-size:15px;">Repair or replacement of any engine item, including specifically, without limitation, all components of the
cooling, fuel, electrical, engine control system, and all ignition system components, belts, hoses, and filters.</li>
        <li style="font-size:15px;">Any engine used for competition racing or related purposes.</li>
        <li style="font-size:15px;">Any engine which has been repaired or remodelled to which any device or accessory not conforming to the
original manufacturer specifications has been installed.
</li>
        <li style="font-size:15px;">Warranty DOES NOT apply to any part damaged as a result of overheating or lack of lubrication. Any
warranty repairs must be authorized by Wiseman Automart and will be handled on a case-by-case basis.</li>
        <li style="font-size:15px;">Upon submitting the Warranty Claim, you MUST submit documentation, as required during the Claim
process, within 5 Business days or your claim will be denied, with no exceptions.
</li>
        <li style="font-size:15px;">Furthermore, the continued operation of the vehicle after an issue has been identified will void the Warranty
Claim. If we elect to replace your part with another part, the replacement is considered to be a repair of the
original unit. Your original date of installation and mileage at that time remains in effect.</li>
        <li style="font-size:15px;">We stand behind our warranties and want to put your mind at rest when purchasing a used auto part from us.
If you have any concerns, please contact us at 888 892 0989.</li>
</ul>
<p style="text-align:justify;font-size:15px;"> <b>Return & Refund Policy:</b></p>
    <ul>
        <li style="font-size:15px;">Items that have been modified or disassembled for testing will not be accessible for return. Items that are not
the initial part that was shipped will not be refunded.</li>
        <li style="font-size:15px;">The expense of return shipping will not be reimbursed.</li>
        <li style="font-size:15px;">Please provide a thorough explanation as to why the part is being returned when contacting Wiseman
Automart. ALL OUR PARTS ARE UNIQUELY IDENTIFIED BY MARKINGS ON THE PART</li>
        <li style="font-size:15px;">Items not returned in their original state (excluding items damaged in shipping and confirmed by Wiseman
Automart) will not be refunded</li>
        <li style="font-size:15px;">We will happily issue a full refund on the initial purchase price or send a replacement part once the item is
returned. When an object is returned, it is inspected, and if approved, a credit request is forwarded to
accounting team. Once the returned part has been verified and inspected, customer refunds are given.</li>
</ul>
<p style="text-align:justify;font-size:15px;"> <b>Service or Enquiry:</b></p>
    <ul>
        <li style="font-size:15px;">To prove a problem or to resolve any query with a specific component or installation, ALL PROBLEMS
MUST BE IN WRITING VIA E-MAIL to service@wisemanautomart.com</li>
</ul>
<p style="text-align:justify;font-size:15px;"> <b>Chargeback Policy:</b></p>
    <ul>
        <li style="font-size:15px;"><b>Wants to cancel the order without any reason:</b> If the customer wants to cancel the order due to his
personal reason or without disclosing the reason then the refund is subjected to 25% restocking fees and two
way shipping charges.
</li>
        <li style="font-size:15px;"><b>The part is defective or not as described:</b> If the part is not working properly or does not match the
description provided by the seller, we will ship you the replacement part. Still you want to cancel the order
we will charge both way shipping and 25% restocking fees.</li>
        <li style="font-size:15px;"><b>The part was damaged during shipping:</b> We are not responsible, if the part is damaged during shipping,
still we are entitled to replace the part. Cancellation of order will incur both way shipping charges. Please
take photos of the package damage as this will help speed up the replacement or return process.
</li>
        <li style="font-size:15px;"><b>Ordered a Wrong Part:</b> If the customer placed a wrong order, and want to cancel the order will make
him/her to pay restocking fees (same as mentioned above) and both way shipping. To avoid these charges
what we do best is to replace your part with the correct without any extra charges (price of new part varies &
the difference need to be paid by the customer).</li>
        <li style="font-size:15px;"><b>The Wrong Part was shipped:</b> We prefer replacement of the part if we ship you the wrong part. We have an
option of getting the part replaced, if we would have shipped you the wrong part in the first instance. If you
still want to cancel the order then the restocking fees and one way shipment applies.</li>
</ul>
<p style="text-align:justify;font-size:15px;"> <b>Buyer's Remorse:</b></p>
    <ul>
        <li style="font-size:15px;">The buyer is responsible for all shipping fees paid both ways. Buyer's remorse may result in a re-stocking
charge of up to 25% in some cases.
 Refund will not be given if the role is -</li>
        <li style="font-size:15px;">Damaged when returned to our location.</li>
        <li style="font-size:15px;">If certain things have been installed (partial or full). If the item was not delivered by us.
</li>
        <li style="font-size:15px;">If any items have been tampered with or any accessories that have been taken from the shipped part, and
if the part is not in the same condition in which Wiseman Automart shipped it, we are not obligated to
accept the part back.
</li>
</ul>
<p style="text-align:justify;font-size:15px;"> <b>Changes to our Policy::</b></p>
    <ul>
        <li style="font-size:15px;">These terms and conditions were most recently modified on 1st January 2024. Previous editions of our terms
and conditions are available upon request</li>
        <li style="font-size:15px;">These terms and conditions apply to your purchase. We reserve the right to modify our terms and conditions
at any time, so do not assume that the same terms will apply to future purchases</li>
        <li style="font-size:15px;">During the sale, our agent makes it obvious to every customer that we only sell Used Car Parts. We do not
accept the part return due to its appearance and minor rusty conditions. We sell the part based on the age of
the car, and we test every part before shipping it. Since we only sell used car parts, customers cannot claim a
charge back based on the condition or appearance of the part. During a sale, we make certain that we follow
every steps as promised by our sales agent. We do not take charge backs if the customer claim with their
bank without notifying us once after receiving the part. If there is a problem with the part, you can always
email us to service@wisemanautomart.com with the proper information and a couple of photos to ensure that
you receive a replacement. We have a dedicated team who are ready to assist every customer in order to
ensure their satisfaction. Please visit our website at www.wisemanautomart.com to learn more about our
refund and return policies. To avoid fraudsters, we have put together this invoice with clear Terms and
Conditions so that our customer may conduct a fraud charge on us once the part has been delivered.</li>
    </ul>
    <p style="color:#cc0000;font-style:italic;font-weight:bold;text-align:center;"> ***In the event that any returns of parts or chargebacks are an act of “false/fraudulent activity”, the customer will
be answerable to our Attorney, and Wiseman Automart reserves the right to file a lawsuit. ***</p>
</div>

</body>

</html>
